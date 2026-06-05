import numpy as np
from datetime import datetime
import re
import spacy
import pandas as pd



def information_Extraction(text):
    '''Input : OCR Text 
    Output : Saving Key Information(date,amount,description,source) '''

    #Date -> 
    
    date_patterns = [
        r'\b\d{2}[/-]\d{2}[/-]\d{4}\b',       # DD/MM/YYYY or MM/DD/YYYY
        r'\b\d{4}[/-]\d{2}[/-]\d{2}\b',       # YYYY/MM/DD or YYYY-MM-DD
        r'\b\d{2}[.]\d{2}[.]\d{4}\b',         # DD.MM.YYYY
        r'\b\d{4}[.]\d{2}[.]\d{2}\b',         # YYYY.MM.DD
        r'\b\d{2}[/-]\d{2}[/-]\d{2}\b',       # DD/MM/YY or MM/DD/YY
        r'\b\d{8}\b',                         # DDMMYYYY (no separator)
    
        r'\b\d{1,2}(st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[.,]?\s+\d{4}\b',
        r'\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b',
    
        r'\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(st|nd|rd|th)?[.,]?\s+\d{4}\b',
        r'\b\d{4}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(st|nd|rd|th)?\b',
    
        r'\b\d{2}[/-]\d{2}[/-]\d{2}\b',                         # DD/MM/YY
        r'\b\d{2}[/-]\d{4}\b',                                  # MM/YYYY
        r'\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}\b'
    ,  # Month YYYY
    
        r'\bon the\s+\d{1,2}(st|nd|rd|th)?\s+of\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[.,]?\s+\d{4}\b',
        r'\b\d{1,2}(st|nd|rd|th)?\s+day of\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[.,]?\s+\d{4}\b',
    
        r'\b\d{4}[-/]\d{2}[-/]\d{2}\s+\d{2}:\d{2}(:\d{2})?\b',   # 2025-02-15 14:23:05
        r'\b\d{2}[-/]\d{2}[-/]\d{4}\s+\d{2}:\d{2}(:\d{2})?\b',   # 15/02/2025 14:23
        r'\b\d{1,2}(st|nd|rd|th)?\s+(Jan|Feb|Mar|...)\s+\d{4}\s+at\s+\d{1,2}:\d{2}\s*(AM|PM|am|pm)?\b'  # 15 Feb 2025 at 2:30 PM
    
        r'\b\d{1,2}(st|nd|rd|th)?\s+(Jan|Feb|Mar|...)\b',
        r'\b(Jan|Feb|Mar|...)\s+\d{1,2}(st|nd|rd|th)?\b'
    
        
    ]

#-----------------------------------------------------------------------
    # # Search and print all matches 
    
    

    def parse_date(date_str):
        # Remove ordinal suffixes (st, nd, rd, th)
        date_str = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date_str, flags=re.IGNORECASE).strip()
        
        # List of possible datetime formats you expect based on your regexes
        date_formats = [
            "%d/%m/%Y",
            "%m/%d/%Y",
            "%Y/%m/%d",
            "%Y-%m-%d",
            "%d.%m.%Y",
            "%Y.%m.%d",
            "%d/%m/%y",
            "%m/%d/%y",
            "%d%m%Y",
            "%d %b %Y",
            "%b %d %Y",
            "%Y %b %d",
            "%d-%m-%y",
            "%m-%Y",
            "%b %Y",
            "%Y-%m-%d %H:%M:%S",
            "%d/%m/%Y %H:%M",
            "%d %b %Y at %I:%M %p",
            "%d %B %Y",
            "%B %d %Y",
            "%Y %B %d",
            
        ]
        
        # Try parsing using each format
        for fmt in date_formats:
            try:
                return datetime.strptime(date_str, fmt)
            except ValueError:
                continue
        
        # If no format matched, return None or original string
        return None


    #-------------------------------------------
    dates = []
    for pattern in date_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            # match can be a tuple if regex groups are used - flatten it
            if isinstance(match, tuple):
                match = " ".join(match).strip()
            parsed_date = parse_date(match)
            if parsed_date:
                dates.append(parsed_date)
                
    dates_only = [d.date() for d in dates if d is not None]
    
    
    
    
    #--------------------------------------------------------------------------------------------
    #issue 1 :  Multiple Dates Fixed -> latest date
    latest_date = max(dates_only)
    
    
    #----------------------------------------------------------------------
    #Amount -> 
    
    def get_total_amount(ocr_text):
        lines = [line.strip() for line in ocr_text.strip().split('\n') if line.strip()]
        
        amount_keywords = [ "Total", "Amount", "Amount (₹)", "Amount (INR)", "INR", "Rs.", "Rupees", "Value", "Total Value", "Grand Total",
            "Salary Amount", "Monthly Amount", "Final Amount", "Payable Amount", "Total (Amount)", "Total Salary",
            "Total Earnings", "Gross Salary", "Gross Pay", "Total Gross", "Total Remuneration", "Total Emoluments",
            "Total Income", "Total Pay", "Total Compensation", "Total CTC", "Total Payable", "Amount Payable",
            "Net Salary", "Net Pay", "Net Amount", "Take Home Salary", "Take Home Pay", "Final Salary", "Final Pay",
            "Salary Credited", "Salary Paid", "Net Remuneration", "Net Income", "Amount Credited", "Amount Received",
            "Take-Home Salary", "Salary Payable", "Salary Disbursed", "Pay After Deductions", "Amount Paid",
            "Total Expense", "Total Cost", "Total Charges", "Total Payment", "Total Spend", "Total Expenditure",
            "Total Outflow", "Total Disbursement", "Total Billing", "Total Invoice Amount", "Total Debit",
            "Total Settlement", "Total Reimbursement", "Total Claim", "Total Withdrawal", "Amount Due", "Amount Spent",
            "Expense Total", "Overall Expense", "Total Outlay", "Amount Paid", "Total Savings", "Total Amount Saved",
            "Total Balance", "Total Deposits", "Total Accumulated", "Total Contribution", "Total Fund",
            "Total Amount in Savings", "Total Principal", "Total Accrued Amount", "Total Interest Earned",
            "Total Maturity Amount", "Total Account Balance", "Total Amount Available", "Total Amount Deposited",
            "Total Net Savings", "Total Accumulated Balance", "Final Savings Amount", "Total Cash Value",
            "Total Investment Amount", "Savings Amount", "Amount Saved", "Savings Total", "Overall Savings",
            "Total Accrual", "Grand Total Savings"
        ]
        
        def extract_amount(line):
            pattern = r'(?:₹|Rs\.?|INR)?\s*[\d,]+(?:\.\d+)?'
            matches = re.findall(pattern, line)
            if matches:
                amounts = []
                for match in matches:
                    clean = re.sub(r'[^\d.]', '', match.replace(',', ''))
                    try:
                        amounts.append(float(clean))
                    except:
                        continue
                return max(amounts) if amounts else None
            return None
    
        # Step 1: Backward keyword match
        for line in reversed(lines):
            if any(keyword.lower() in line.lower() for keyword in amount_keywords):
                amt = extract_amount(line)
                if amt:
                    return amt
    
        # Step 2: Backup using "total", "final", "net"
        for idx in reversed(range(len(lines))):
            line = lines[idx].lower()
            if any(kw in line for kw in ["total", "final", "net"]):
                context = lines[max(0, idx - 1): min(len(lines), idx + 2)]
                for ctxt_line in context:
                    amt = extract_amount(ctxt_line)
                    if amt:
                        return amt
    
        # Step 3: Final fallback - last amount
        for line in reversed(lines):
            amt = extract_amount(line)
            if amt:
                return amt
    
        return None


    Amount=get_total_amount(text)
    
    #------------------------------------------------------------------------------
    #Source 
    
    def extract_source(text):
        """
        Extracts the first non-empty line from the document text as the source.
        """
        lines = text.strip().splitlines()
        for line in lines:
            cleaned = line.strip()
            if cleaned:  # skip empty lines
                source = cleaned
                return source
        return None  # if no valid lines found
    
    
    source = extract_source(text)
    
    
    
    #----------------------------------------
    # Text Preprocessing 
    
    
    # Load English tokenizer, tagger, parser, NER and word vectors
    nlp = spacy.load("en_core_web_sm")
    
    # Raw text input
    raw_text = "Hello there! I'm learning NLP—Natural Language Processing—in 2025, using Python & libraries like spaCy, etc."
    
    # Process the text using spaCy
    doc = nlp(text)
    
    # Preprocessing steps
    preprocessed_tokens = []
    
    for token in doc:
        # Remove punctuation, special characters, and stopwords
        if token.is_alpha and not token.is_stop:
            # Lowercasing and lemmatization
            preprocessed_tokens.append(token.lemma_.lower())
    
    # Merge tokens with space
    clean_text = " ".join(preprocessed_tokens)
    
    return latest_date, Amount, source, clean_text
    
    
    

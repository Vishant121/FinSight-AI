import React, { useState } from "react";
import NewTransactionModal from "./NewTransactionModal";

function NewTransactionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>New Transaction</button>
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default NewTransactionButton;

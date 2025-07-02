import React, { useState } from "react";

interface SetSavingsGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (amount: number) => void;
  initialGoal?: number;
}

const SetSavingsGoalModal: React.FC<SetSavingsGoalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialGoal = 0,
}) => {
  const [goal, setGoal] = useState(initialGoal);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal <= 0) {
      setError("Goal must be greater than 0");
      return;
    }
    setError("");
    onSave(goal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Set Savings Goal</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min={1}
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2 mb-2"
            placeholder="Enter goal amount"
          />
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetSavingsGoalModal;

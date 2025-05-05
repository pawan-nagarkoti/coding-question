import React, { useEffect, useState } from "react";

export default function ChipInput() {
  const [input, SetInput] = useState(""); // create chip
  const [containerChip, setContainerChip] = useState(
    JSON.parse(localStorage.getItem("chip")) || [] // get item from locastorage if we have either pass the blank array
  ); // container for chip

  const handleChipSubmit = (e) => {
    // add chip input
    e.preventDefault();
    if (input === "" || input.length <= 0 || input.trim().length <= 0) {
      // if we have space, blank string or multiple blank string then noting print after hitting enter button
      return;
    }

    setContainerChip((prev) => [...prev, { name: input, id: Date.now() }]); // stored chip
    SetInput(""); // reset input field
  };

  useEffect(() => {
    localStorage.setItem("chip", JSON.stringify(containerChip)); // get data from local storage
  }, [containerChip]); // render every time when we have new chip

  const handleDeleteChip = (deletedId) => {
    // delete chip
    setContainerChip(containerChip?.filter((f) => f.id !== deletedId));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px 0",
      }}
    >
      <h2>Chips Input</h2>
      <form onSubmit={handleChipSubmit}>
        <input
          type="text"
          placeholder="Type a chip and press tag"
          style={{ padding: "8px", width: "200px" }}
          onChange={(e) => SetInput(e.target.value)}
          value={input}
        />
      </form>

      <div style={{ display: "flex", gap: "1rem" }}>
        {containerChip && containerChip.length > 0 ? (
          containerChip?.map((v, i) => (
            <React.Fragment key={i}>
              <p
                style={{
                  border: "1px solid gray",
                  borderRadius: "2rem",
                  padding: ".5rem .8rem",
                  backgroundColor: "gray",
                  fontSize: "14px",
                  color: "white",
                }}
              >
                {v?.name.trim()}
                <span
                  onClick={() => handleDeleteChip(v?.id)}
                  style={{
                    marginLeft: "10px",
                    color: "red",
                    fontWeight: "400",
                    cursor: "pointer",
                  }}
                >
                  X
                </span>
              </p>
            </React.Fragment>
          ))
        ) : (
          <p>Add Input Chip</p>
        )}
      </div>
    </div>
  );
}

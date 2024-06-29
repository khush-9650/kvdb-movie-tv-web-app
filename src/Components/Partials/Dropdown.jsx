import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="select">
      <select onChange={func} name="format" id="format" defaultValue="0">
        <option  value="0" disabled>
          {title}
        </option>
        {options.map((opt,index) => (
          <option value={opt} key={index}>{opt.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;

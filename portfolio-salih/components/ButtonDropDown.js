import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ButtonDropDown = ({ items }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const renderMenu = (items) => {
    return (
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item.handlers}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className="mx-2 d-inline-block"
    >
      <DropdownToggle caret size="sm" className="px-2"></DropdownToggle>
      {renderMenu(items)}
    </Dropdown>
  );
};

export default ButtonDropDown;

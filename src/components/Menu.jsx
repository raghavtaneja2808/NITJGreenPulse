import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import { useState } from "react";
   
  export function MenuCustomAnimation() {

    const [selectedLanguage, setselectedLanguage] = useState('English');
    return (
     <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <Button>{selectedLanguage}</Button>
        </MenuHandler>
        <MenuList>
            {["Hindi", "Punjabi", "French"].map((lang) => (
                <MenuItem key={lang} onClick={() => setselectedLanguage(lang)}>{lang}</MenuItem>
            ))};

        </MenuList>
      </Menu>
    );
  }
import * as F from '$src/features'
import * as C from '$src/components'
import css from './ToolsPage.module.css'
import { useState } from 'react';

export const ToolsPage = () => {
  const buttons = [
    { label: 'Botón 1' },
    { label: 'Botón 2' },
    { label: 'Botón 3' },
  ];

  return (
    <F.PgLayout>
      <Dropdown buttons={buttons} />
    </F.PgLayout>
  )
}

export const Dropdown = ({ buttons }) => {
  const [isOpen, $isOpen] = useState(false);

  const toggleDropdown = () => {
    $isOpen(!isOpen);
  };

  return (
    <div className={css.dropdown}>
      <C.ButtonBase handleClick={toggleDropdown} text="Abrir dropdown" />
      {isOpen && (
        <ul>
          {buttons.map((button, index) => (
            <li key={index}>
              <C.ButtonBase
                text={button.label}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


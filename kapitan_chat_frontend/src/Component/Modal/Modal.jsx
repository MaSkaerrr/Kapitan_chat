import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ModalContext } from "../../Main/Main";
export default function Modal(/*{ item, onClose, onSave }*/) {
  const{item,onClose,onSave} = useContext(ModalContext);


  if (!item) return null; // Если нет элемента, ничего не рендерим
  const [value, setValue] = useState(item.title); 

 {/*useEffect(() => {
    setValue(item.title);
  }, [item]);
 */}
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>

      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Item</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {/* Содержимое модального окна */}
              <input type='text' value={value} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => onSave(item.id, value)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div> {/* Добавляем фон для закрытия по клику */}
    </>
  );
}
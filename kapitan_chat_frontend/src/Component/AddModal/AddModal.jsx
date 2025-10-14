import { useState } from "react";
import { AddModalContext } from "../../Provider/Provider/AddModalProvider";

export default function AddModal() {
  const { lastitem, Close, Submit,inputRef } = AddModalContext();
  const [Title, setTitle] = useState((inputRef.current.value !==null)? inputRef.current.value : "");
  const [completed, setCompleted] = useState(false);

  const handleChangeTitle = (ev) => {
    setTitle(ev.target.value);
  };

  const handleChangeCompleted = (ev) => {
    setCompleted(ev.target.checked);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    Submit({ id: lastitem.id + 1, title: Title, completed });
    setTitle(""); // Сбросить поле ввода
    setCompleted(false); // Сбросить состояние чекбокса
  };

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" aria-label="Close" onClick={Close}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <input type='text' name="id" value={lastitem.id + 1} readOnly={true} />
                <input type='text' name="title" value={Title} onChange={handleChangeTitle} required />
                <input type='checkbox' name="completed" checked={completed} onChange={handleChangeCompleted} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={Close}>Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={Close}></div>
    </>
  );
}
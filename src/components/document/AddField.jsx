import React, { useState } from 'react'
import Dialog from './Dialog'

const AddField = () => {
  const [editing, setEditing] = useState(false);
  const [fieldType, setFieldType] = useState('ShortText');
  const [fieldName, setFieldName] = useState('');
  const [valueText, setValueText] = useState('');
  const [valueNumber, setValueNumber] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [valueAttachment, setValueAttachment] = useState('');

  const handleFieldTypeChange = (event) => {
    setFieldType(event.target.value);
  };

  const handleFieldNameChange = (event) => {
    setFieldName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setEditing(false); // Close the dialog
    setFieldName(''); // Reset field name
  };

  const renderInputField = () => {
    switch (fieldType) {
      case 'ShortText':
        return <input type="text" id="field-value" className='field-dialog__input' required placeholder="Intodu un text" value={valueText} onChange={(e) => setValueText(e.target.value)} />;
      case 'LongText':
        return <textarea id="field-value" className='field-dialog__textarea' required placeholder="Introdu un text" rows="7" cols="30" value={valueText} onChange={(e) => setValueText(e.target.value)}></textarea>;
      case 'Number':
        return <input type="number" id="field-value" className='field-dialog__input' required placeholder="Introdu un număr" value={valueNumber} onChange={(e) => setValueNumber(e.target.value)} />;
      case 'Date':
        return <input type="date" id="field-value" className='field-dialog__input' required value={valueDate} onChange={(e) => setValueDate(e.target.value)} />;
      case 'Attachment':
        return <input type="file" id="field-value" className='field-dialog__input' required onChange={(e) => setValueAttachment(e.target.files[0])} />;
      default:
        return null;
    }
  };

  const modal =
    <Dialog title={"Adaugă un câmp nou"} showModal={editing} onClose={() => setEditing(false)} id='add-field'>
      <div className='field-dialog__content'>
        <form className='field-dialog__form' onSubmit={handleFormSubmit}>
          <label htmlFor="field-type" className='field-dialog__label'>Tipul Câmpului</label>
          <select id="field-type" className='field-dialog__select' value={fieldType} onChange={handleFieldTypeChange}>
            <option value="ShortText">Text scurt</option>
            <option value="LongText">Text lung</option>
            <option value="Number">Număr</option>
            <option value="Date">Dată</option>
            <option value="Attachment">Atașament</option>
          </select>
          <label htmlFor="field-name" className='field-dialog__label'>Numele Câmpului</label>
          <input type="text" id="field-name" className='field-dialog__input' placeholder="Introdu numele câmpului" required value={fieldName} onChange={handleFieldNameChange} />
          <label htmlFor="field-value" className='field-dialog__label'>Valoarea Câmpului</label>
          {renderInputField()}
          <button type='submit' className='button field-dialog__button'>Adaugă un câmp</button>
        </form>
      </div>
    </Dialog>;

  return (
    <>
      <button onClick={() => setEditing(prev => !prev)} className='button field__button--add'>+</button>
      {editing && modal}
    </>
  )
}

export default AddField
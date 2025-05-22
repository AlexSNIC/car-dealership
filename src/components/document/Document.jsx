import React from 'react';
import Date from './Date';
// import Id from './Id';
import ShortText from './ShortText';
import LongText from './LongText';
import Number from './Number';
import Attachment from './Attachment';
import AddField from './AddField';

const Fields = {ShortText, LongText, Number, Date, Attachment};

const Document = ({document}) => {
  const {id, ...fields} = document;
  return (
    <div className="document">
        {Object.entries(fields).sort(([name1, value1], [name2, value2]) => value1.order - value2.order).map(([name, value]) => {
          const FieldComponent = Fields[value.type] || (() => <div>Unknown field type</div>);
          return (
            <FieldComponent key={name} name={name} {...value} />
          );
        })}
        <AddField />
    </div>
  );
};

export default Document;
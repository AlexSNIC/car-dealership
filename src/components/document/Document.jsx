import React from 'react';
import Date from './Date';
// import Id from './Id';
import ShortText from './ShortText';
import LongText from './LongText';
import Number from './Number';
import Attachment from './Attachment';

const Fields = {ShortText, LongText, Number, Date, Attachment};

const Document = ({document}) => {
  const {id, ...fields} = document;
  return (
    <div className="document">
        {Object.entries(fields).map(([name, value]) => {
          const FieldComponent = Fields[value.type] || (() => <div>Unknown field type</div>);
          return (
            <FieldComponent {...value} />
          );
        })}
    </div>
  );
};

export default Document;
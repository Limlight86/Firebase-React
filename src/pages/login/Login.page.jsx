import React from 'react';
import { SectionWrapper, Form } from '../../components';
import { schema } from './Login.schema';

export default _ =>  (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      <Form schema={schema} handleSubmit={_ => console.log('submiting login form')} />
    </SectionWrapper>
  );

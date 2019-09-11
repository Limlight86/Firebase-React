import React from 'react';
import { Form, SectionWrapper } from '../../components';
import { schema } from './Register.schema';

export default _ => (
    <SectionWrapper columnDefs="col-md-6 col-md-offset-3">
      <Form schema={schema} handleSubmit={_ => console.log('submiting register form')} />
    </SectionWrapper>
);



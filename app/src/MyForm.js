import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

/*
  deleted:
    state, ✅
    handleChanges, ✅
    handleSubmit
    form onSubmit ✅
    input values ✅
    input onChange ✅
    labels ✅
*/

// Tasks - Add two fields - size, notes. Don't forget to add them to the values in mPTV

const Formi = ({ errors, touched }) => {
  return (
    <div className="animal-form">
      <h1>Animal Form</h1>
      <Form>
        <Field type="text" name="species" placeholder="Species" />
        {touched.species && errors.species && (
          <p className="error">{errors.species}</p>
        )}

        <Field type="text" name="size" placeholder="Size" />
        {touched.size && errors.size && <p className="error">{errors.size}</p>}

        <Field type="text" name="notes" placeholder="Notes" />
        {touched.notes && errors.notes && (
          <p className="error">{errors.notes}</p>
        )}

        <button type="submit">Submit!</button>
      </Form>
    </div>
  );
};

// Higher Order Component - HOC
// Hard to share component / stateful logic (custom hooks)
// Function that takes in a component, extends some logic onto that component,
// returns a _new_ component (copy of the passed in component with the extended logic)
const MyForm= withFormik({
  mapPropsToValues({ species, size, notes }) {
    return {
      species: species || '',
      size: size || '',
      notes: notes || ''
    };
  },

  validationSchema: Yup.object().shape({
    species: Yup.string().required(),
    size: Yup.string().required(),
    notes: Yup.string()
  }),

  handleSubmit(values) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  }
})(Formi); // currying functions in Javascript


export default MyForm;
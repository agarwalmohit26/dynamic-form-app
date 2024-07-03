import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const FormFill = () => {
  const questions = useSelector((state) => state.form.questions);

  const validationSchema = Yup.object().shape({
    responses: Yup.array().of(
      Yup.object().shape({
        response: Yup.array().of(Yup.string().required('Option is required')).min(1, 'At least one option is required'),
      })
    ),
  });

  const handleSubmit = (values) => {
    axios.post('http://localhost:5000/api/forms/submit', {
      formId: 'FORM_ID_HERE', // Replace with the actual form ID
      responses: values.responses.map((response, index) => ({
        questionId: questions[index]._id,
        response: response.response,
      })),
    })
    .then((response) => {
      console.log('Form submitted successfully', response.data);
    })
    .catch((error) => {
      console.error('Error submitting form', error);
    });
  };

  return (
    <div>
      <h1>Fill Form</h1>
      <Formik
        initialValues={{ responses: questions.map(() => ({ response: [] })) }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            {questions.map((question, index) => (
              <div key={index}>
                <h3>{question.question}</h3>
                <FieldArray name={`responses.${index}.response`}>
                  {({ remove, push }) => (
                    <div>
                      {question.options.map((option, idx) => (
                        <div key={idx}>
                          <Field type={question.type === 'single-choice' ? 'radio' : 'checkbox'} name={`responses.${index}.response`} value={option} />
                          <label>{option}</label>
                        </div>
                      ))}
                      {touched.responses && errors.responses && errors.responses[index] && (
                        <div>{errors.responses[index].response}</div>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>
            ))}
            <button type="submit">Submit Form</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormFill;

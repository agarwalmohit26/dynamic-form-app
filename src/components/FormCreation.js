import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, reorderQuestions } from '../features/formSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormCreation = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.form.questions);
  const navigate = useNavigate();

  const [questionType, setQuestionType] = useState('single-choice');

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderQuestions(items));
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    options: Yup.array().of(Yup.string().required('Option is required')).min(2).max(4),
  });

  const handleSaveForm = () => {
    axios.post('http://localhost:5000/api/forms/create', { questions })
      .then((response) => {
        console.log('Form created successfully', response.data);
        navigate.push('/forms');
      })
      .catch((error) => {
        console.error('Error creating form', error);
      });
  };

  return (
    <div>
      <h1>Create Form</h1>
      <button onClick={() => setQuestionType('single-choice')}>Single Choice</button>
      <button onClick={() => setQuestionType('multiple-choice')}>Multiple Choice</button>
      <Formik
        initialValues={{ question: '', options: ['', ''] }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addQuestion({ ...values, type: questionType }));
          resetForm();
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Field name="question" placeholder="Question" />
            {touched.question && errors.question && <div>{errors.question}</div>}
            <FieldArray name="options">
              {({ remove, push }) => (
                <div>
                  {values.options.map((option, index) => (
                    <div key={index}>
                      <Field name={`options.${index}`} placeholder={`Option ${index + 1}`} />
                      {touched.options && errors.options && errors.options[index] && <div>{errors.options[index]}</div>}
                      <button type="button" onClick={() => remove(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push('')} disabled={values.options.length >= 4}>Add Option</button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Add Question</button>
          </Form>
        )}
      </Formik>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <h3>{question.question}</h3>
                      <ul>
                        {question.options.map((option, idx) => (
                          <li key={idx}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleSaveForm}>Save Form</button>
    </div>
  );
};

export default FormCreation;

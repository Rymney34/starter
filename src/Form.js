import { Formik, Form, Field, ErrorMessage,useField } from 'formik';


import * as Yup from 'yup'

// const validate = values => {
//     const errors = {};
//     if (!values.name){
//         errors.name = "Required field";
//     }else if (values.name.length < 2 ){
//         errors.name = 'min 2 symbolds!'
//     }

//     if(!values.email){
//         errors.email = "Required field";

//     }else if (
//            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//     ) {
//            errors.email = 'Invalid email address';
 
//         }

//     return errors
// }

//own component to not repeat my self
const MyTextInput = ({label, ...props}) => {
    const[field,meta]=useField(props)
    return(
        <>
            <label htmlFor={props.name}>{label}</label>
                <input {...props}{...field}
                    />
                    {meta.touched && meta.error ? (
                        <div className='error'>{meta.error}</div>
                    ): null}
        </>
    )
}

const MyCheckBox = ({children, ...props}) => {
    const[field,meta]=useField({...props, type: 'checkbox'})
    return(
        <>
            <label className='checkbox'>
                     <input type="checkbox" {...props}{...field}/>
                     {children}
            </label>
               
                    {meta.touched && meta.error ? (
                        <div className='error'>{meta.error}</div>
                    ): null}
        </>
    )
}

const CustomForm = () => {
   
    return (
       <Formik
            initialValues = {{
                name:'',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false 
            }}
            validationSchema = {Yup.object({
            name: Yup.string()
                        .min(2, 'Min 2 Charachters')
                        .required('Required Field'),
            email: Yup.string()
                        .email('Wrong Email address')
                        .required('Required Field'),
            amount: Yup.number()
                        .min(5, "Minium 5 chars")
                        .required('Required Field'),
            currency: Yup.string().required("Choose Currency"),

            text: Yup.string().min(10,'min is 10 chars'),

            terms: Yup.boolean()
                        .required("you should tick box!")
                        .oneOf([true], "You should tick the box")


        })}
        onSubmit ={ values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form" >
                <h2>Send Donations</h2>
                <MyTextInput
                    id="name"
                    label="Your Name"
                    name="name"
                    type="text"
                />
    
               
                <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                    
                />
                <ErrorMessage className='error' name="email" component='div'/>
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                   
                />
               <ErrorMessage className='error' name="amount" component='div'/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name="currency" component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                
                />
                <ErrorMessage className='error' name="text" component='div'/>
                
                  
                   <MyCheckBox name="terms">  Alow terms and cond</MyCheckBox>
                   
                <button type="submit">Отправить</button>
            </Form>
       </Formik>
    )
}

export default CustomForm;
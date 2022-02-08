import React from "react";
import type { NextPage } from "next";
import { Formik, Form } from "formik";
import { useRegisterMutation } from "../generated/graphql";
import { toError } from "../utils/toError";
import InputWrapper from "../components/InputWrapper";

interface registerProps {}

const register: NextPage<registerProps> = ({}) => {
  const [register] = useRegisterMutation();

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const res = await register({ variables: { input: values } });
        console.log(res);

        if (res.data?.register.errors?.field) {
          // make graphql error obj into formik error obj

          // res.data.register.errors: {
          //           field: "username",
          //           message: "Username already taken",
          //           __typename: "FieldError",
          //         },
          // to
          // setErrors({
          //     username: string;
          //     email: string;
          //     password: string;
          // })
          setErrors(toError(res.data.register.errors));
        }
      }}
    >
      {({ isSubmitting, values, handleChange, errors }) => (
        <Form className="container">
          <InputWrapper label="Username" name="username" />
          <InputWrapper label="Email" name="email" type="email" />
          <InputWrapper label="Password" name="password" type="password" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default register;

// ⬇⬇⬇ original form & formik form template ⬇⬇⬇

//  <div className="mb-3">
//             <label htmlFor="nameInput" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="nameInput"
//               name="username"
//               onChange={handleChange}
//               value={values.username}
//               aria-describedby="textHelp"
//             />
//             {errors.username && (
//               <div className="text-danger" id="feedback">
//                 {errors.username}
//               </div>
//             )}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               Email address
//             </label>
//             <input
//               type="email"
//               value={values.email}
//               className="form-control"
//               name="email"
//               onChange={handleChange}
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//             />
//             {errors.email && (
//               <div className="text-danger" id="feedback">
//                 {errors.email}
//               </div>
//             )}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">
//               Password
//             </label>
//             <input
//               name="password"
//               type="password"
//               value={values.password}
//               onChange={handleChange}
//               className="form-control"
//               id="exampleInputPassword1"
//             />
//             {errors.password && (
//               <div className="text-danger" id="feedback">
//                 {errors.password}
//               </div>
//             )}
//           </div>

//   <Formik
//     initialValues={{ name: "jared" }}
//     onSubmit={(values, actions) => {
//       setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//         actions.setSubmitting(false);
//       }, 1000);
//     }}
//   >
//     {(props) => (
//       <form onSubmit={props.handleSubmit}>
//         <input
//           type="text"
//           onChange={props.handleChange}
//           onBlur={props.handleBlur}
//           value={props.values.name}
//           name="name"
//         />
//         {props.errors.name && <div id="feedback">{props.errors.name}</div>}
//         <button type="submit">Submit</button>
//       </form>
//     )}
//   </Formik>

import React from 'react'
import { CustomForm, CustomTextArea, DatePickerInput, CustomSelect } from "./CustomInputs";
import { Row, Col } from "react-bootstrap";
import { WorkHours } from '../assets/Parsers';

export const Email = ({ label = "Email", onChange, email, placeholder = "Enter your email" }) => (
    <CustomForm label={label} type="email" placeholder={placeholder} name="email" onChange={onChange} value={email} />
)

export const Name = ({ onChange, name, placeholder = "Enter your name", label = "Fullname" }) => (
    <CustomForm label={label} type="text" placeholder={placeholder} minLength="3" name="name" onChange={onChange} value={name} />
)

export const Password = ({ id = "password", onChange, password, label = "Password", placeholder = "Enter your password", name = "password" }) => (
    <CustomForm id={id} label={label} type="password" placeholder={placeholder} name={name} onChange={onChange} value={password} minLength="6" />
)

export const ConfirmPassword = ({ onChange, password_confirmation, placeholder = "Re-enter your password" }) => (
    <CustomForm label="Confirm Password" type="password" placeholder={placeholder} name="password_confirmation" onChange={onChange} value={password_confirmation} minLength="6" equalTo="#password" />
)

export const Title = ({ onChange, placeholder = "Enter appointment title", label = "Title", title }) => (
    <CustomForm label={label} type="text" placeholder={placeholder} minLength="3" name='title' onChange={onChange} value={title} />
)

export const Description = ({ onChange, description, placeholder = "Enter appointment description", label = "Description", required = false }) => (
    <CustomTextArea label={label} placeholder={placeholder} name='description' onChange={onChange} value={description} required={required} />
)

export const StartDate = ({ onChange, start }) => (
    <CustomSelect label="Start Time" name="start" onChange={onChange} options={WorkHours} placeholder="Select start of appointment" value={start} />
)

export const EndDate = ({ onChange, end }) => (
    <CustomSelect label="End Time" name="end" onChange={onChange} options={WorkHours} placeholder="Select end of appointment" value={end} />
)

export const FormLayout = ({ children }) => (
    <Row>
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
            {children}
        </Col>
    </Row>
)
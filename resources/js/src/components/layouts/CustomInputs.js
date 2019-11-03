import React from 'react'
import { Form, Button } from "react-bootstrap";
import { DateTime } from 'react-datetime-bootstrap';
import moment from 'moment';

export const Label = ({ label, name, required = false, className = "form-control-label" }) => (
    <label htmlFor={label} className={className}>{name}:{required && <span className="text-danger">*</span>}</label>
)

export const CustomForm = ({ className, label, type, placeholder, minLength, name, onChange, value, required = true, id, equalTo, maxLength, min, max, onKeyUp }) => (
    <Form.Group>
        {
            label && <Form.Label>{label}: {required && <span className="text-danger">*</span>}</Form.Label>
        }
        <Form.Control onKeyUp={onKeyUp} className={className} id={id} type={type} placeholder={placeholder} required={required} minLength={minLength} onChange={onChange} name={name} value={value} data-parsley-equalto={equalTo} maxLength={maxLength} min={min} max={max} />
    </Form.Group>
)

export const CustomTextArea = ({ formRef, className, label, rows = "3", placeholder, minLength, name, onChange, value, required = true }) => (
    <Form.Group>
        {
            label &&
            <Form.Label>{label}:  {required && <span className="text-danger">*</span>}</Form.Label>
        }
        <Form.Control ref={formRef} className={className} as="textarea" rows={rows} placeholder={placeholder} required={required} minLength={minLength} name={name} onChange={onChange} value={value} />
    </Form.Group>
)

export const CustomButton = ({ block = false, variant, title, icon, loading = false, onClick, disabled = false, className, iconRight = false, type, show = true, size, showLoadingText = true }) => (
    <>
        {
            show &&
            <Button size={size} variant={variant} type={type} block={block} disabled={loading ? true : (disabled ? disabled : false)} onClick={onClick} className={`${className} shadow`}>
                {
                    icon && !iconRight && <i className={`fas fa-fw fa-${loading ? 'spinner fa-spin' : icon}`}></i>
                }
                {loading && showLoadingText ? ' Loading' : ` ${title}`}
                {
                    icon && iconRight && <i className={`fas fa-fw fa-${loading ? 'spinner fa-spin' : icon}`}></i>
                }
            </Button>
        }
    </>
)

export const CustomSelect = ({ label, placeholder, name, onChange, value, options, required = true }) => (
    <Form.Group>
        {
            label && <Form.Label>{label}:  {required && <span className="text-danger">*</span>}</Form.Label>
        }
        <Form.Control as="select" onChange={onChange} value={value} name={name} required={required}>
            <option value="">{placeholder}</option>
            {
                options.map((option, index) => (
                    <option value={option.value} key={index} className="text-capitalize">{option.label}</option>
                ))
            }
        </Form.Control>
    </Form.Group>
)

export const DatePickerInput = ({ placeholder, name, handleDateChange, labelName, required = true, verticalPosition = 'top', format, value }) => {
    return (
        <Form.Group>
            <Label name={labelName} label={labelName} required={required} />
            <DateTime placeholder={placeholder} onChange={(date) => handleDateChange(date, name)} required={required} value={value} pickerOptions={{
                widgetPositioning: {
                    horizontal: "auto",
                    vertical: verticalPosition
                },
                format,
                minDate: moment.now(),
                disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23, 24],
            }} />
        </Form.Group>
    )
}
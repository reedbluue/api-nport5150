import mongoose from "mongoose";
import { ValidationHelper } from "../../helpers/validationHelper.js";
import { AttributeInterface } from "../modelsInterfaces/AttributeInterface.js";

export const AttributeSchema = new mongoose.Schema<AttributeInterface>({
  desc: {
    type: String,
    required: [true, 'O campo "desc" não pode ser nulo!'],
    validate: {
      validator: function(v: string) { return ValidationHelper.checkLength(v, 4, 20); },
      message: prop => `A descrição "${prop.value}" deve ter de 4 a 20 caractéres!`,
    },
    unique: true,
    lowercase: true
  },
  regex: {
    type: String,
    required: [true, 'O campo "regex" não pode ser nulo!']
  },
  unity: {
    type: String,
    required: [true, 'O campo "unity" não pode ser nulo!'],
    validate: {
      validator: function(v: string) { return ValidationHelper.checkLength(v, 4, 20); },
      message: prop => `A unidade "${prop.value}" deve ter de 4 a 20 caractéres!`,
    },
  },
  lastData: {
    type: String,
    default: ''
  }
});
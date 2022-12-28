import { AttributeInterface } from "../../models/modelsInterfaces/AttributeInterface.js";

export class AttributeDto implements AttributeInterface {
  public desc: string;
  public lastData: string;
  public regex: string;
  public unity: string;
  constructor(model: any) {
    this.desc = model.desc;
    this.lastData = model.lastData || '';
    this.regex = model.regex;
    this.unity = model.unity;
  }
}
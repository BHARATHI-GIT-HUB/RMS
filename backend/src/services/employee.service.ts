import { Employee } from "../models/employee";
import { IRepository } from "./service";

export class EmployeeService extends IRepository<Employee> {}

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor() {}
  async createPix(value) {
    const response = await axios.get(
        `http://all-in-one-system-cfe0c681a225.herokuapp.com/Getnet/${value}`,
    );
    return response.data;
  }
}

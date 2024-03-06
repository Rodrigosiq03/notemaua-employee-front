/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosInstance } from "axios";
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import { JsonWithdrawProps } from "../../domain/entities/withdraw";
import { decorate, injectable } from "inversify";

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  constructor(private readonly httpWithdraw: AxiosInstance) {}

  async createWithdraw(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number
  ): Promise<JsonWithdrawProps> {
    try {
      const response = await this.httpWithdraw.post<JsonWithdrawProps>(
        "/create-withdraw",
        {
          notebookSerialNumber,
          studentRA,
          name,
          initTime,
        }
      );

      if (response.status === 200) {
        return response.data;
      }

      throw new Error("Error creating withdraw");
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

decorate(injectable(), WithdrawRepositoryHttp);

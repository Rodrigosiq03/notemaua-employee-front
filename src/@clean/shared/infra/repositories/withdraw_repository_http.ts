/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosInstance } from "axios";
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import {
  JsonGetAllWithdrawsProps,
  Withdraw,
} from "../../domain/entities/withdraw";
import { decorate, injectable } from "inversify";

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  constructor(private readonly httpWithdraw: AxiosInstance) {}

  async getAllWithdraws(): Promise<Withdraw[]> {
    try {
      const token = JSON.parse(localStorage.getItem("token")!);
      const response = await this.httpWithdraw.post<JsonGetAllWithdrawsProps>(
        "/get-all-withdraw",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        return response.data.withdraws;
      }

      throw new Error("Error creating withdraw");
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

decorate(injectable(), WithdrawRepositoryHttp);

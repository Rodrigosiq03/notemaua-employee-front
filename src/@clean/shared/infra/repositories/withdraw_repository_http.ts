/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosInstance } from "axios";
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import {
  JsonGetAllWithdrawsProps,
  Withdraw,
} from "../../domain/entities/withdraw";
import { decorate, injectable } from "inversify";

type updateWithdrawStateResponse = {
  message: string;
};

type finishWithdrawResponse = {
  message: string;
};

export class WithdrawRepositoryHttp implements IWithdrawRepository {
  constructor(private readonly httpWithdraw: AxiosInstance) {}

  async getAllWithdraws(): Promise<Withdraw[]> {
    try {
      const token = localStorage.getItem("token");
      const response = await this.httpWithdraw.get<JsonGetAllWithdrawsProps>(
        "/get-all-withdraw",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  async updateWithdrawState(notebookSerialNumber: string, state: boolean): Promise<string> {
    try {
      const token = localStorage.getItem("token");
      const response = await this.httpWithdraw.post<updateWithdrawStateResponse>(
        "/update-withdraw-state",
        {
          notebookSerialNumber,
          state,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if(response.status === 200) {
        return response.data.message;
      }
      throw new Error("Error updating withdraw state");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async finishWithdraw(notebookSerialNumber: string): Promise<string> {
    try {
      const token = localStorage.getItem("token");
      const response = await this.httpWithdraw.post<finishWithdrawResponse>(
        `/finish-withdraw`,
        {
          notebookSerialNumber,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if(response.status === 200) {
        return response.data.message;
      }
      throw new Error("Error finished withdraw");
    } catch(error: any){
      throw new Error(error);
    }
  }
}

decorate(injectable(), WithdrawRepositoryHttp);

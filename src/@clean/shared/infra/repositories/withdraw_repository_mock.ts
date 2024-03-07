/* eslint-disable @typescript-eslint/no-unused-vars */

import { decorate, injectable } from "inversify";
import { IWithdrawRepository } from "../../../modules/withdraw/domain/repositories/withdraw_repository_interface";
import { JsonWithdrawProps, Withdraw } from "../../domain/entities/withdraw";
import { STATE } from "../../domain/enums/state_enum";
import { NoItemsFound } from "../../domain/helpers/errors/usecase_errors";

export class WithdrawRepositoryMock implements IWithdrawRepository {
  getAllWithdraws(): Promise<Withdraw[]> {
    throw new Error("Method not implemented.");
  }
  updateWithdrawState(notebookSerialNumber: string, state: boolean): Promise<string> {
    throw new Error("Method not implemented.");
  }
  finishWithdraw(notebookSerialNumber: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  private inactiveWithdraws: Withdraw[] = [
    new Withdraw({
      notebookSerialNumber: "ABC123",
      state: STATE.INACTIVE,
    }),
    new Withdraw({
      notebookSerialNumber: "DEF456",
      state: STATE.INACTIVE,
    }),
  ];

  async createWithdraw(
    notebookSerialNumber: string,
    studentRA: string,
    name: string,
    initTime: number
  ): Promise<JsonWithdrawProps> {
    const existingWithdraw = this.inactiveWithdraws.find(
      (w) => w.notebookSerialNumber === notebookSerialNumber
    );

    if (!existingWithdraw) {
      throw new NoItemsFound("notebookSerialNumber");
    }

    return {
      notebookSerialNumber: existingWithdraw.notebookSerialNumber,
      studentRA: studentRA,
      message: "Withdraw created",
      initTime: initTime,
      state: STATE.PENDING,
    };
  }
}

decorate(injectable(), WithdrawRepositoryMock);

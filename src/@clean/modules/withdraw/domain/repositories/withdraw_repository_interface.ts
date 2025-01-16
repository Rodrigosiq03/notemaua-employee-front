import {
  Withdraw,
} from "../../../../shared/domain/entities/withdraw";

export interface IWithdrawRepository {
  getAllWithdraws(): Promise<Withdraw[]>;
  updateWithdrawState(notebookSerialNumber: string, state: boolean): Promise<string>;
  finishWithdraw(notebookSerialNumber: string): Promise<string>;
  createLaptop(notebookSerialNumber: string): Promise<string>;
  deleteLaptop(notebookSerialNumber: string): Promise<string>;
}

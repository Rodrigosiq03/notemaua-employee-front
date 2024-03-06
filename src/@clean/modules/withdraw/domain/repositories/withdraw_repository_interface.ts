import {
  Withdraw,
} from "../../../../shared/domain/entities/withdraw";

export interface IWithdrawRepository {

  getAllWithdraws(): Promise<Withdraw[]>;
}

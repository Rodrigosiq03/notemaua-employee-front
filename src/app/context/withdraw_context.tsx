/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "vm";
import { Withdraw } from "../../@clean/shared/domain/entities/withdraw";
import {
  RegistryWithdraw,
  containerWithdraw,
} from "../../@clean/shared/infra/containers/withdraw_container";
import { GetAllWithdrawUsecase } from "../../@clean/modules/withdraw/usecases/get_all_withdraw_usecase";
import { PropsWithChildren, useState } from "react";

export type withdrawContextType = {
  getAllWithdraws: () => Promise<Withdraw[] | undefined>;
  withdraws: Withdraw[] | undefined;
  setWithdraws(withdraws: Withdraw[]): void;
};

const defaultWithdrawContext: withdrawContextType = {
  getAllWithdraws: async () => {
    return [];
  },

  setWithdraws: (data: Withdraw[]) => void 0,
  withdraws: [],
};

export const WithdrawContext = createContext(defaultWithdrawContext);

const getAllWitdrawUsecase = containerWithdraw.get<GetAllWithdrawUsecase>(
  RegistryWithdraw.GetAllWithdrawUsecase
);

export function WithdrawContextProvider({ children }: PropsWithChildren) {
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  async function getAllWithdraws() {
    try {
      const withdraws = await getAllWitdrawUsecase.execute();
      setWithdraws(withdraws);
      return withdraws;
    } catch (error: any) {
      console.error("Something went wrong with getAllWithdraws: ", error);
    }
  }
  return (
    <WithdrawContext.Provider
      value={{
        getAllWithdraws,
        withdraws,
        setWithdraws,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Withdraw } from "../../@clean/shared/domain/entities/withdraw";
import { RegistryWithdraw, containerWithdraw } from "../../@clean/shared/infra/containers/withdraw_container";
import { GetAllWithdrawUsecase } from "../../@clean/modules/withdraw/usecases/get_all_withdraw_usecase";
import { PropsWithChildren, useState, createContext } from "react";
import { UpdateWithdrawUsecase } from "../../@clean/modules/withdraw/usecases/update_withdraw_state_usecase";
import { FinishWithdrawUsecase } from "../../@clean/modules/withdraw/usecases/finish_withdraw_usecase";

export type withdrawContextType = {
  getAllWithdraws: () => Promise<Withdraw[] | undefined>;
  withdraws: Withdraw[] | undefined;
  setWithdraws(withdraws: Withdraw[]): void;
  updateWithdrawState: (notebookSerialNumber: string, state: boolean) => Promise<string | undefined>;
  finishWithdraw: (notebookSerialNumber: string) => Promise<string | undefined>;
};

const defaultWithdrawContext: withdrawContextType = {
  getAllWithdraws: async () => {
    return [];
  },
  finishWithdraw: async(notebookSerialNumber: string) => {
    return "";
  },
  updateWithdrawState: async(notebookSerialNumber: string, state: boolean) => {
    return "";
  },

  setWithdraws: (data: Withdraw[]) => void 0,
  withdraws: [],
};

export const WithdrawContext = createContext(defaultWithdrawContext);

const getAllWitdrawUsecase = containerWithdraw.get<GetAllWithdrawUsecase>(
  RegistryWithdraw.GetAllWithdrawUsecase
);

const updateWithdrawStateUsecase = containerWithdraw.get<UpdateWithdrawUsecase>(
  RegistryWithdraw.UpdateWithdrawStateUsecase
);

const finishWithdrawUsecase = containerWithdraw.get<FinishWithdrawUsecase>(
  RegistryWithdraw.FinishWithdrawUsecase
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

  async function updateWithdrawState(notebookSerialNumber: string, state: boolean) {
    try {
      const message = await updateWithdrawStateUsecase.execute(notebookSerialNumber, state);
      return message;
    } catch (error: any) {
      console.error("Something went wrong with updateWithdrawState: ", error);
    }
  }

  async function finishWithdraw(notebookSerialNumber: string) {
    try {
      const message = await finishWithdrawUsecase.execute(notebookSerialNumber);
      return message;
    } catch (error: any) {
      console.error("Something went wrong with finishWithdraw: ", error);
    }
  }
  return (
    <WithdrawContext.Provider
      value={{
        getAllWithdraws,
        withdraws,
        setWithdraws,
        updateWithdrawState,
        finishWithdraw,
      }}
    >
      {children}
    </WithdrawContext.Provider>
  );
}

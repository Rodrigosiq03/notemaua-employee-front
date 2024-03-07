import { Container } from "inversify";
import "reflect-metadata";
import { httpWithdraw } from "../http";
import { WithdrawRepositoryMock } from "../repositories/withdraw_repository_mock";
import { WithdrawRepositoryHttp } from "../repositories/withdraw_repository_http";
import { GetAllWithdrawUsecase } from "../../../modules/withdraw/usecases/get_all_withdraw_usecase"; // Importe o caso de uso GetAllWithdrawUsecase
import { STAGE } from "../../domain/enums/stage_enum";
import { UpdateWithdrawUsecase } from "../../../modules/withdraw/usecases/update_withdraw_state_usecase";
import { FinishWithdrawUsecase } from "../../../modules/withdraw/usecases/finish_withdraw_usecase";

export const RegistryWithdraw = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  WithdrawRepositoryMock: Symbol.for("WithdrawRepositoryMock"),
  WithdrawRepositoryHttp: Symbol.for("WithdrawRepositoryHttp"),
  GetAllWithdrawUsecase: Symbol.for("GetAllWithdrawUsecase"),
  UpdateWithdrawStateUsecase: Symbol.for("UpdateWithdrawStateUsecase"),
  FinishWithdrawUsecase: Symbol.for("FinishWithdrawUsecase"),
};

export const containerWithdraw = new Container();

containerWithdraw
  .bind(RegistryWithdraw.AxiosAdapter)
  .toConstantValue(httpWithdraw);

containerWithdraw
  .bind(RegistryWithdraw.WithdrawRepositoryMock)
  .to(WithdrawRepositoryMock);
containerWithdraw
  .bind(RegistryWithdraw.WithdrawRepositoryHttp)
  .toDynamicValue((context) => {
    return new WithdrawRepositoryHttp(
      context.container.get(RegistryWithdraw.AxiosAdapter)
    );
  });

containerWithdraw
  .bind(RegistryWithdraw.GetAllWithdrawUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === STAGE.TEST) {
      return new GetAllWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    } else if (
      import.meta.env.VITE_STAGE === STAGE.PROD ||
      import.meta.env.VITE_STAGE === STAGE.DEV
    ) {
      return new GetAllWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryHttp)
      );
    } else {
      throw new Error("Invalid stage");
    }
});

containerWithdraw
  .bind(RegistryWithdraw.UpdateWithdrawStateUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === STAGE.TEST) {
      return new UpdateWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    } else if (
      import.meta.env.VITE_STAGE === STAGE.PROD ||
      import.meta.env.VITE_STAGE === STAGE.DEV
    ) {
      return new UpdateWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryHttp)
      );
    } else {
      throw new Error("Invalid stage");
    }
});

containerWithdraw
  .bind(RegistryWithdraw.FinishWithdrawUsecase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === STAGE.TEST) {
      return new FinishWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    } else if (
      import.meta.env.VITE_STAGE === STAGE.PROD ||
      import.meta.env.VITE_STAGE === STAGE.DEV
    ) {
      return new FinishWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryHttp)
      );
    } else {
      throw new Error("Invalid stage");
    }
});

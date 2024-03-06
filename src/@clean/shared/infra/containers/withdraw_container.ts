import { Container } from "inversify";
import "reflect-metadata";
import { httpWithdraw } from "../http";
import { WithdrawRepositoryMock } from "../repositories/withdraw_repository_mock";
import { WithdrawRepositoryHttp } from "../repositories/withdraw_repository_http";
import { GetAllWithdrawUsecase } from "../../../modules/withdraw/usecases/get_all_withdraw_usecase"; // Importe o caso de uso GetAllWithdrawUsecase
import { STAGE } from "../../domain/enums/stage_enum";

export const RegistryWithdraw = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  WithdrawRepositoryMock: Symbol.for("WithdrawRepositoryMock"),
  WithdrawRepositoryHttp: Symbol.for("WithdrawRepositoryHttp"),
  GetAllWithdrawUsecase: Symbol.for("GetAllWithdrawUsecase"),
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
    if (process.env.EXPO_PUBLIC_STAGE === STAGE.TEST) {
      return new GetAllWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryMock)
      );
    } else if (
      process.env.EXPO_PUBLIC_STAGE === STAGE.PROD ||
      process.env.EXPO_PUBLIC_STAGE === STAGE.DEV
    ) {
      return new GetAllWithdrawUsecase(
        context.container.get(RegistryWithdraw.WithdrawRepositoryHttp)
      );
    } else {
      throw new Error("Invalid stage");
    }
  });

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

export interface AppState {
  loading: boolean;
  mode: string;
  snackbar: boolean;
  notice: string;
}

const SUCCESS = "success";
const ERROR = "error";

@Module({ store, dynamic: true, name: "appModule" })
class AppModule extends VuexModule implements AppState {
  public loading = true;
  public mode = "";
  public snackbar = false;
  public notice = "";

  @Action closeNotice(): void {
    this.setNotice("");
    this.setMode("");
    this.setSnackbar(false);
  }

  @Action closeNoticeWithDelay(timeout = 2000): void {
    setTimeout(() => {
      this.setNotice("");
      this.setMode("");
      this.setSnackbar(false);
    }, timeout);
  }

  @Action sendSuccessNotice(notice: string): void {
    this.setNotice(notice);
    this.setMode(SUCCESS);
    this.setSnackbar(true);
    this.closeNoticeWithDelay();
  }

  @Action sendErrorNotice(notice: string): void {
    this.setNotice(notice);
    this.setMode(ERROR);
    this.setSnackbar(true);
    this.closeNoticeWithDelay();
  }

  @Mutation setLoading(loading: boolean): void {
    this.loading = loading;
  }

  @Mutation setNotice(notice: string): void {
    console.log(" notice .... ", notice);
    this.notice = notice;
  }

  @Mutation setSnackbar(snackbar: boolean): void {
    this.snackbar = snackbar;
  }

  @Mutation setMode(mode: string): void {
    this.mode = mode;
  }
}

export const appModule = getModule(AppModule); // Apps;

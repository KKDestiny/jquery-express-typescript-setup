/*
 * @Date: 2022-10-05 22:40:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { BaseRepository } from "./base.repository";
import accountModel from "../models/account.model";
import { AccountType } from "../interfaces/account.interface";

class ArticleRepository extends BaseRepository<AccountType> {}

export default new ArticleRepository(accountModel);

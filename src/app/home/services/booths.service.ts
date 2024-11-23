import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { Observable, map } from "rxjs";

import { GET_USER_BOOTHS, JOIN_BOOTH } from "./gql-actions.gql";
import { Booth } from "../models";

@Injectable()
export class BoothsService {
  constructor(
    private readonly apollo: Apollo,
  ) {}
  

}


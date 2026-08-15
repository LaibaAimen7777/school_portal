import { IsArray } from 'class-validator';

// bulk-promote.dto.ts
export class BulkPromoteDto {
  // each entry maps one source class to a destination class (null = graduate)
  @IsArray()
  promotions!: { fromClassId: number; toClassId: number | null }[];
}

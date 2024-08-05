import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  getSchemaPath,
  ApiResponse,
} from '@nestjs/swagger';
import { GenericErrorResponse } from '../../types/responses';
import { HttpStatus } from '@nestjs/common';

export function _InternalServerErrorResponse() {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description: 'Internal Server error',
      schema: {
        properties: {
          statusCode: {
            type: 'number',
            example: HttpStatus.INTERNAL_SERVER_ERROR,
          },
          message: {
            type: 'string',
            example: 'Internal server error',
          },
        },
      },
    }),
  );
}

export function _ApiResponse(status: number, description: string, type?: any) {
  return applyDecorators(
    ApiResponse({
      status,
      description,
      type,
    }),
  );
}

export function _BadRequestResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Bad request was sent',
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(GenericErrorResponse),
          },
          {
            properties: {
              statusCode: {
                type: 'number',
                example: HttpStatus.BAD_REQUEST,
              },
            },
          },
        ],
      },
    }),
  );
}

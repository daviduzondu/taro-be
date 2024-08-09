import { getSchemaPath, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function CustomResponse(wrapper: any, payloadType: any, status: number) {
  return applyDecorators(
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(wrapper) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(payloadType),
              },
            },
          },
        ],
      },
    }),
  );
}

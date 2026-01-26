import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'API Bee Api\'C - Backend',
    version: '1.0.0',
    endpoints: {
      beekeepers: {
        list: 'GET /api/beekeepers',
        byCode: 'GET /api/beekeepers/:code',
        create: 'POST /api/beekeepers',
      },
      honeyTypes: {
        list: 'GET /api/honey-types',
        byCode: 'GET /api/honey-types/:code',
        create: 'POST /api/honey-types',
      },
      products: {
        list: 'GET /api/products',
        bySlug: 'GET /api/products/:slug',
        byCategory: 'GET /api/products/category/:category',
        create: 'POST /api/products',
      },
      lots: {
        list: 'GET /api/lots',
        byLotNumber: 'GET /api/lots/:lotNumber',
        create: 'POST /api/lots',
      },
      traceability: {
        byLotNumber: 'GET /api/traceability/:lotNumber',
      },
      beeperf: {
        tracabiliteByNumeroLot: 'GET /api/beeperf/numero-lot/:numeroLot',
        numerosLots: 'GET /api/beeperf/numeros-lots',
      },
    },
  });
}

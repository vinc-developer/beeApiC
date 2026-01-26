import { NextRequest, NextResponse } from 'next/server';

// Configuration
const BEEPERF_API_URL = process.env.BEEPERF_API_URL || 'https://web.beeperf.com/api';
const API_KEY = process.env.BEEPERF_API_KEY;

// GET /api/beeperf/numeros-lots - Récupère l'ensemble des numéros de lots via BeePerf
export async function GET(request: NextRequest) {
  try {
    // Vérifier que la clé API est configurée
    if (!API_KEY || API_KEY === 'votre_clé_api_ici') {
      return NextResponse.json(
        {
          error: 'Configuration incorrecte',
          message: "La clé API BeePerf n'est pas configurée sur le serveur",
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const per_page = searchParams.get('per_page') || '25';
    const page = searchParams.get('page') || '1';

    const response = await fetch(
      `${BEEPERF_API_URL}/tracabilite/numeros-lots?per_page=${per_page}&page=${page}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: 'Erreur API BeePerf',
          message: errorData?.message || 'Erreur lors de la récupération des données',
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des numéros de lots BeePerf:', error);

    return NextResponse.json(
      {
        error: 'Erreur serveur',
        message: 'Une erreur est survenue lors du traitement de la requête',
      },
      { status: 500 }
    );
  }
}

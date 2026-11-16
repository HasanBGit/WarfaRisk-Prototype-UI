from rest_framework.response import Response
from rest_framework.views import APIView

from . import mock_data
from .serializers import (
    DoseResultSerializer,
    ExplainabilityResponseSerializer,
    FhirMedicationRequestSerializer,
    PatientInputSerializer,
)


class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "ok"})


class PredictDoseView(APIView):
    """
    Returns the combined or clinical-only mock dose result depending on whether
    genotype fields were submitted
    """

    def post(self, request):
        input_serializer = PatientInputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        has_genotype = input_serializer.has_genotype()

        result = mock_data.get_dose_result(has_genotype)
        out = DoseResultSerializer(result)
        return Response(out.data)


class ExplainView(APIView):
    def post(self, request):
        input_serializer = PatientInputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        has_genotype = input_serializer.has_genotype()

        result = mock_data.get_explanation(has_genotype)
        out = ExplainabilityResponseSerializer(result)
        return Response(out.data)


class FhirMedicationRequestView(APIView):
    """Stub: demonstrates the FHIR R4 export round trip described in the manuscript"""

    def post(self, request):
        stub = {
            "resourceType": "MedicationRequest",
            "status": "draft",
            "intent": "proposal",
            "dosageInstruction": [
                {"text": "Warfarin, dose per WarfaRisk prototype recommendation"}
            ],
        }
        out = FhirMedicationRequestSerializer(stub)
        return Response(out.data)

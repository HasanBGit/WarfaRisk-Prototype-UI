from rest_framework import serializers


class PatientInputSerializer(serializers.Serializer):
    """Validates the Screen 1 form payload. Bounds match the manuscript's
    stated preprocessing ranges, not clinical practice guidelines."""

    age = serializers.IntegerField(min_value=18, max_value=100)
    weight = serializers.FloatField(min_value=30, max_value=200)
    height = serializers.FloatField(min_value=100, max_value=230)
    targetInr = serializers.FloatField(required=False)
    indication = serializers.CharField()
    ancestry = serializers.CharField()
    amiodarone = serializers.BooleanField(default=False)
    statin = serializers.BooleanField(default=False)
    enzymeInducer = serializers.BooleanField(default=False)
    cyp2c9 = serializers.CharField(required=False, allow_blank=True)
    vkorc1 = serializers.CharField(required=False, allow_blank=True)

    def has_genotype(self) -> bool:
        data = self.validated_data
        return bool(data.get("cyp2c9")) and bool(data.get("vkorc1"))


class DoseSerializer(serializers.Serializer):
    weekly = serializers.FloatField()
    daily = serializers.FloatField()


class IntervalSerializer(serializers.Serializer):
    low = serializers.FloatField()
    high = serializers.FloatField()
    confidence = serializers.IntegerField(allow_null=True)
    calibrated = serializers.BooleanField()


class MetricsSerializer(serializers.Serializer):
    mae = serializers.FloatField()
    r2 = serializers.FloatField()
    pw20 = serializers.FloatField()


class TrainingSummarySerializer(serializers.Serializer):
    dataset = serializers.CharField()
    n = serializers.IntegerField()
    split = serializers.CharField()
    pipeline = serializers.CharField()
    featureSetLabel = serializers.CharField()


class CalibrationSerializer(serializers.Serializer):
    available = serializers.BooleanField()
    subgroup = serializers.CharField(required=False)
    coverage = serializers.FloatField(required=False)
    target = serializers.IntegerField(required=False)
    met = serializers.BooleanField(required=False)


class PortabilitySerializer(serializers.Serializer):
    available = serializers.BooleanField()
    subgroup = serializers.CharField(required=False)
    stackingPenalty = serializers.FloatField(required=False)
    catboostPenalty = serializers.FloatField(required=False)


class DoseResultSerializer(serializers.Serializer):
    featureSet = serializers.ChoiceField(choices=["combined", "clinical-only"])
    dose = DoseSerializer()
    model = serializers.CharField()
    interval = IntervalSerializer()
    metrics = MetricsSerializer(allow_null=True)
    trainingSummary = TrainingSummarySerializer()
    calibration = CalibrationSerializer()
    portability = PortabilitySerializer()


class ShapAttributionSerializer(serializers.Serializer):
    feature = serializers.CharField()
    value = serializers.FloatField()


class ExplainabilityResponseSerializer(serializers.Serializer):
    shapAttributions = ShapAttributionSerializer(many=True)
    pharmacogenomicSummary = serializers.DictField()
    evidenceLinks = serializers.ListField()
    ragExplanation = serializers.DictField()
    portabilityNote = serializers.DictField(allow_null=True)


class FhirMedicationRequestSerializer(serializers.Serializer):
    """Stub demonstrating the FHIR R4 MedicationRequest round trip the
    manuscript describes. Not a full FHIR resource implementation."""

    resourceType = serializers.CharField(default="MedicationRequest")
    status = serializers.CharField(default="draft")
    intent = serializers.CharField(default="proposal")
    dosageInstruction = serializers.ListField()

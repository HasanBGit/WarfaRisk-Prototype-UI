from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.HealthCheckView.as_view()),
    path("predict/", views.PredictDoseView.as_view()),
    path("explain/", views.ExplainView.as_view()),
    path("fhir/medication-request/", views.FhirMedicationRequestView.as_view()),
]

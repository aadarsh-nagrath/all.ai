from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional, Literal
from datetime import datetime

class ProviderInfo(BaseModel):
    name: str
    region: str
    context_length: int
    latency: str
    throughput: str

class LLMModel(BaseModel):
    model_name: str
    provider: List[ProviderInfo]
    status: Literal['ready', 'active', 'maintainance']
    parameters: str
    context_length: int
    max_output_length: Optional[int] = None
    last_updated: datetime
    tag: str
    Performance: str
    Response_Time: str
    Cost: str
    Success_Rate: str
    short_description: str = Field(..., max_length=125)
    long_description: Optional[str] = None
    usecase: List[str] = Field(..., max_items=4)
    key_features: List[str] = Field(..., max_items=3)
    precision: Optional[str] = None
    benchmarks: Optional[List[str]] = None
    model_weights_available: Optional[bool] = None
    api_compatibility: Optional[str] = None
    model_icon: Optional[str] = None 
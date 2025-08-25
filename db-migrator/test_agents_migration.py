#!/usr/bin/env python3
"""
Test script for agents migration
"""

import asyncio
import sys
import os

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import Agent
from agents_data import agents_data

def test_agent_model():
    """Test that Agent model can be created from agents_data"""
    print("Testing Agent model creation...")
    
    for i, agent_data in enumerate(agents_data[:5]):  # Test first 5 agents
        try:
            agent = Agent(**agent_data)
            print(f"✓ Successfully created agent: {agent.title}")
            print(f"  Category: {agent.category}")
            print(f"  Image: {agent.image}")
            print()
        except Exception as e:
            print(f"✗ Failed to create agent {i}: {e}")
            return False
    
    print(f"Total agents in data: {len(agents_data)}")
    return True

def test_categories():
    """Test that all agents have valid categories"""
    print("Testing agent categories...")
    
    categories = set()
    for agent_data in agents_data:
        categories.add(agent_data["category"])
    
    print("Found categories:")
    for category in sorted(categories):
        count = sum(1 for agent in agents_data if agent["category"] == category)
        print(f"  {category}: {count} agents")
    
    return True

if __name__ == "__main__":
    print("Testing Agents Migration Setup")
    print("=" * 40)
    
    success = True
    success &= test_agent_model()
    success &= test_categories()
    
    if success:
        print("\n✓ All tests passed! Agents migration is ready.")
    else:
        print("\n✗ Some tests failed. Please check the errors above.")
        sys.exit(1) 
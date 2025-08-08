"use client"

import { useEffect, useState } from "react"
import ABICLoader from "@/components/abic-loader"

export default function Loading() {
  return <ABICLoader loadingText="Loading Excellence" />
}

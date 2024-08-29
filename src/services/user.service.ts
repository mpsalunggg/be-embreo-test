import { getAllVendor } from '../repositories/user.repository'
import { ApiError } from '../utils/error.util'
import { VendorInfo } from '../utils/type.util'

export const getAllVendorService = async (): Promise<VendorInfo[] | null> => {
  const vendor = await getAllVendor()
  if (!vendor?.length) {
    throw new ApiError('Nothing vendor', 404)
  }
  return vendor
}

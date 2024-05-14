import {
  addAmenity,
  getAmenities,
  getProperties,
} from "@/services/api/routine";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useRoutine() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    isLoading: propertyLoading,
    data: properties,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  const {
    isLoading: amenityLoading,
    data: amenities,
    error: amenityError,
  } = useQuery({
    queryKey: ["amenities"],
    queryFn: getAmenities,
  });

  const {mutate:createAmenity, isPending: amenityPending} = useMutation({
    mutationFn: addAmenity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
    onError: (error: any) => {
      toast({
        title: error.response.data.message,
        isClosable: true,
        position: "top",
        status: "error",
      });
    },
  });

  return {
    propertyLoading,
    amenityLoading,
    amenities,
    properties,
    error,
    amenityError,
    createAmenity,
    amenityPending
  };
}

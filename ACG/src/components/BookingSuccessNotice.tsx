import { CheckCircle2, X } from 'lucide-react';
import { focusRing, touchMin } from '@/lib/ui-classes';

interface BookingSuccessNoticeProps {
  onDismiss?: () => void;
  compact?: boolean;
  className?: string;
  id?: string;
}

export function BookingSuccessNotice({
  onDismiss,
  compact = false,
  className = '',
  id,
}: BookingSuccessNoticeProps) {
  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`rounded-xl border-2 border-green-500/40 bg-green-50 p-5 shadow-lg ${className}`}
    >
      <div className="flex gap-4">
        <div
          className={`flex shrink-0 items-center justify-center rounded-full bg-green-500 text-white ${
            compact ? 'h-10 w-10' : 'h-12 w-12'
          }`}
          aria-hidden
        >
          <CheckCircle2 className={compact ? 'h-6 w-6' : 'h-7 w-7'} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-[#1E1B4B] ${compact ? 'text-base' : 'text-lg'}`} style={{ fontWeight: 700 }}>
            Request submitted successfully
          </p>
          <p className={`mt-1 text-[#64748B] ${compact ? 'text-sm' : 'text-base'}`}>
            We&apos;ve received your consultation request. Our team will contact you within{' '}
            <strong className="text-[#1E1B4B]">24 hours</strong>. A confirmation copy was sent to your
            email when provided.
          </p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className={`${touchMin} shrink-0 rounded-lg p-2 text-[#64748B] hover:bg-green-100 ${focusRing}`}
            aria-label="Dismiss notification"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

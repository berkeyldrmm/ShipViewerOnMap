namespace ShipViewerOnMap.Presentation.Middleware
{
    public class RequestTimingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestTimingMiddleware> _logger;

        public RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();

            await _next(context);

            watch.Stop();
            var elapsedMs = watch.ElapsedMilliseconds;
            _logger.LogInformation("Request [{Method}] {Url} executed in {ElapsedMilliseconds}ms",
                context.Request.Method,
                context.Request.Path,
                elapsedMs);
        }
    }

}
